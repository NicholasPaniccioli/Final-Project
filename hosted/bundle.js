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
}; //Displays the form for character creation


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
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class: "), /*#__PURE__*/React.createElement("select", {
      id: "characterClass",
      type: "text",
      name: "class",
      placeholder: "Character Class"
    }, /*#__PURE__*/React.createElement("option", {
      value: "wizard"
    }, "Wizard")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "subclass"
    }, "Subclass: "), /*#__PURE__*/React.createElement("select", {
      id: "characterSubclass",
      type: "text",
      name: "subclass",
      placeholder: "Character Subclass"
    }, /*#__PURE__*/React.createElement("option", {
      value: "fire"
    }, "Fire"), /*#__PURE__*/React.createElement("option", {
      value: "water"
    }, "Water")), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeCharacterSubmit",
      type: "submit",
      value: "Make Character"
    }))
  );
}; //Creates list with created characters
//Also adds upgrade button


var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "characterList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyCharacter"
      }, "No characters yet"))
    );
  }

  var characterNodes = props.characters.map(function (character) {
    return (/*#__PURE__*/React.createElement("div", {
        key: character._id,
        className: "character"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "character face",
        className: "characterFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "characterName"
      }, " Name: ", character.name), /*#__PURE__*/React.createElement("h3", {
        className: "characterAge"
      }, " Age: ", character.age), /*#__PURE__*/React.createElement("h3", {
        className: "characterClass"
      }, " Class: ", character["class"]), /*#__PURE__*/React.createElement("h3", {
        className: "characterSubclass"
      }, " Subclass: ", character.subclass), /*#__PURE__*/React.createElement("h3", {
        className: "characterHealth"
      }, " Health: ", character.health), /*#__PURE__*/React.createElement("h3", {
        className: "characterDamage"
      }, " Damage: ", character.damage), /*#__PURE__*/React.createElement("h3", {
        className: "characterEXP"
      }, " EXP: ", character.exp), /*#__PURE__*/React.createElement("div", {
        className: "activities"
      }, /*#__PURE__*/React.createElement("button", {
        className: "trainButton",
        value: character
      }, "Train")))
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
  }); // let select = document.querySelector("#characterSelect");
  // //If no characters stays at default value
  // //If characters available fills selection with them
  // if(characters.length === 0)
  // {
  //     return;
  // } else {
  //     //Restarts select list
  //     select.innerHTML = ""
  //     //Fills it in
  //     for(let i=0; i > characters.length; i++)
  //     {
  //         let chara = characters[i].name;
  //         let option = document.createElement("option");
  //         option.innerHTML = chara;
  //         select.addEventListener(option);
  //     }
  // }
}; // const handleTrainer = (e) => {
//     e.preventDefault();
//     $("characterMessage").animate({width:'hide'}, 350);
//     if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
//         handleError("All fields are required");
//         return false;
//     }
//     if($("#pass").val() !== $("#pass2").val()){
//         handleError("Passwords do not match");
//         return false;
//     }
//     sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
//     return false;
// };
// //Testing for Training room
// const TrainWindow = (props) => {
//     return (
//         <form id="trainForm" 
//             name="trainForm"
//             //onSubmit={handleTrainer}
//             action="/trainer"
//             method="POST"
//             className="trainForm"
//         >
//             <select id="characterSelect">
//                 <option value="none">No Characters</option>
//             </select>
//             <input className="formTrain" type="submit" value="Train"/>
//             <p>Welcome to the Training Room</p>
//         </form>
//     );
// };
// //Fills the select option in training room with available characters
// const fillTrainSelect = function(props){
//     let select = document.querySelector("#characterSelect");
//     //If no characters stays at default value
//     //If characters available fills selection with them
//     if(props.characters.length === 0)
//     {
//         return;
//     } else {
//         //Restarts select list
//         select.innerHTML = ""
//         //Fills it in
//         for(let i=0; i > prop.characters.length; i++)
//         {
//             let chara = prop.characters[i].name;
//             let option = document.createElement("option");
//             option.innerHTML = chara;
//             select.addEventListener(option);
//         }
//     }
// };


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters")); // ReactDOM.render(
  //     <TrainWindow csrf={csrf} />, document.querySelector("#trainRoom")
  // );

  loadCharactersFromServer();
  var trainButton = document.querySelector(".trainButton");
  trainButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("button clicked");
    trainButton.value.exp += 10;
    return false;
  }); //fillTrainSelect();
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

// Creates a window to train characters
var createTrainWindow = function createTrainWindow(props) {
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
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "class"
    }, "Class: "), /*#__PURE__*/React.createElement("select", {
      id: "characterClass",
      type: "text",
      name: "class",
      placeholder: "Character Class"
    }, /*#__PURE__*/React.createElement("option", {
      value: "wizard"
    }, "Wizard")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "subclass"
    }, "Subclass: "), /*#__PURE__*/React.createElement("select", {
      id: "characterSubclass",
      type: "text",
      name: "subclass",
      placeholder: "Character Subclass"
    }, /*#__PURE__*/React.createElement("option", {
      value: "fire"
    }, "Fire"), /*#__PURE__*/React.createElement("option", {
      value: "water"
    }, "Water")), /*#__PURE__*/React.createElement("input", {
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
