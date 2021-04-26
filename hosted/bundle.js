"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();
  $("#characterMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#characterName").val() == '' || $("#characterAge").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var CharacterForm = function CharacterForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "characterForm",
      onSubmit: handleCharacter,
      name: "characterForm",
      action: "/maker",
      method: "POST",
      className: "characterForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "characterName",
      type: "text",
      name: "name",
      placeholder: "Character Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      id: "characterAge",
      type: "text",
      name: "age",
      placeholder: "Character Age"
    }),/*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class: "), /*#__PURE__*/React.createElement("input", {
      id: "characterClass",
      type: "text",
      name: "class",
      placeholder: "Character Class"
    }),/*#__PURE__*/React.createElement("label", {
      htmlFor: "subclass"
    }, "Subclass: "), /*#__PURE__*/React.createElement("input", {
      id: "characterSubclass",
      type: "text",
      name: "subclass",
      placeholder: "Character Subclass"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeCharacterSubmit",
      type: "submit",
      value: "Make Character"
    }))
  );
};

var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "characterList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyCharacter"
      }, "No Characters yet"))
    );
  }

  var characterNodes = props.characters.map(function (character) {
    return (/*#__PURE__*/React.createElement("div", {
        key: character._id,
        className: "character"
      }, /*#__PURE__*/React.createElement("img", {
        //IMPORTANT change later
        src: "/assets/img/domoface.jpeg",
        alt: "character face",
        className: "characterFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "characterName"
      }, " Name: ", character.name), /*#__PURE__*/React.createElement("h3", {
        className: "characterAge"
      }, " Age: ", character.age))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, characterNodes)
  );
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters"));
  loadCharactersFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#characterMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#characterMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};