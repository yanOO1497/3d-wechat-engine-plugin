"use strict";

(function () {
  if (!(cc && cc.EditBoxComponent)) {
    return;
  }

  var KeyboardReturnType = cc.EditBoxComponent.KeyboardReturnType;
  var _p = cc.EditBoxComponent._EditBoxImpl.prototype;
  var _currentEditBoxImpl = null;

  function getKeyboardReturnType(type) {
    switch (type) {
      case KeyboardReturnType.DEFAULT:
      case KeyboardReturnType.DONE:
        return 'done';

      case KeyboardReturnType.SEND:
        return 'send';

      case KeyboardReturnType.SEARCH:
        return 'search';

      case KeyboardReturnType.GO:
        return 'go';

      case KeyboardReturnType.NEXT:
        return 'next';
    }

    return 'done';
  }

  function updateLabelsVisibility(editBox) {
    var placeholderLabel = editBox._placeholderLabel;
    var textLabel = editBox._textLabel;
    var displayText = editBox._impl._text;
    placeholderLabel.node.active = displayText === '';
    textLabel.node.active = displayText !== '';
  }

  cc.EditBoxComponent.prototype.editBoxEditingDidBegan = function () {
    cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
    this.node.emit('editing-did-began', this);
  };

  cc.EditBoxComponent.prototype.editBoxEditingDidEnded = function () {
    cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
    this.node.emit('editing-did-ended', this);
  };

  cc.EditBoxComponent.prototype._updateStayOnTop = function () {// wx not support
  };

  _p.setFocus = function () {
    this._beginEditing();
  };

  _p.isFocused = function () {
    return this._editing;
  };

  _p.setInputMode = function (inputMode) {
    this._inputMode = inputMode;
  };

  _p._beginEditing = function () {
    this.createInput();
  };

  _p._endEditing = function () {
    this._delegate && this._delegate.editBoxEditingDidEnded();
    this._editing = false;
  };

  _p.createInput = function () {
    // Unregister keyboard event listener in old editBoxImpl if keyboard haven't hidden.
    if (_currentEditBoxImpl !== this) {
      if (_currentEditBoxImpl) {
        _currentEditBoxImpl._endEditing();

        __globalAdapter.offKeyboardConfirm(_currentEditBoxImpl.onKeyboardConfirmCallback);

        __globalAdapter.offKeyboardInput(_currentEditBoxImpl.onKeyboardInputCallback);

        __globalAdapter.offKeyboardComplete(_currentEditBoxImpl.onKeyboardCompleteCallback);
      }

      _currentEditBoxImpl = this;
    }

    var multiline = this._inputMode === cc.EditBoxComponent.InputMode.ANY;
    var editBoxImpl = this;
    this._editing = true;

    function onKeyboardConfirmCallback(res) {
      editBoxImpl._text = res.value;
      editBoxImpl._delegate && editBoxImpl._delegate.editBoxEditingReturn && editBoxImpl._delegate.editBoxEditingReturn();

      __globalAdapter.hideKeyboard({
        success: function success(res) {},
        fail: function fail(res) {
          cc.warn(res.errMsg);
        }
      });
    }

    function onKeyboardInputCallback(res) {
      if (res.value.length > editBoxImpl._maxLength) {
        res.value = res.value.slice(0, editBoxImpl._maxLength);
      }

      if (editBoxImpl._delegate && editBoxImpl._delegate.editBoxTextChanged) {
        if (editBoxImpl._text !== res.value) {
          editBoxImpl._text = res.value;

          editBoxImpl._delegate.editBoxTextChanged(editBoxImpl._text);

          updateLabelsVisibility(editBoxImpl._delegate);
        }
      }
    }

    function onKeyboardCompleteCallback() {
      editBoxImpl._endEditing();

      __globalAdapter.offKeyboardConfirm(onKeyboardConfirmCallback);

      __globalAdapter.offKeyboardInput(onKeyboardInputCallback);

      __globalAdapter.offKeyboardComplete(onKeyboardCompleteCallback);

      _currentEditBoxImpl = null;
    }

    __globalAdapter.showKeyboard({
      defaultValue: editBoxImpl._text,
      maxLength: editBoxImpl._maxLength,
      multiple: multiline,
      confirmHold: false,
      // hide keyboard mannually by wx.onKeyboardConfirm
      confirmType: getKeyboardReturnType(editBoxImpl._returnType),
      success: function success(res) {
        editBoxImpl._delegate && editBoxImpl._delegate.editBoxEditingDidBegan && editBoxImpl._delegate.editBoxEditingDidBegan();
      },
      fail: function fail(res) {
        cc.warn(res.errMsg);

        editBoxImpl._endEditing();
      }
    });

    __globalAdapter.onKeyboardConfirm(onKeyboardConfirmCallback);

    __globalAdapter.onKeyboardInput(onKeyboardInputCallback);

    __globalAdapter.onKeyboardComplete(onKeyboardCompleteCallback);
  };
})();