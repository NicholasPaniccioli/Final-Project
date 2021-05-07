const handleCharacter = (e) =>{
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'}, 350);

    if($("#characterName").val() == '' || $("#characterAge").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });

    return false;
};

//Displays the form for character creation
const CharacterForm = (props) => {
    return (
        <form id="characterForm"
            onSubmit={handleCharacter}
            name="characterForm"
            action="/maker"
            method="POST"
            className="characterForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="characterName" type="text" name="name" placeholder="Character Name"/>

            <label htmlFor="age">Age: </label>
            <input id="characterAge" type="text" name="age" placeholder="Character Age"/>

            <label htmlFor="class">Class: </label>
            <select id="characterClass" type="text" name="class" placeholder="Character Class">
                <option value="wizard">Wizard</option>
            </select>

            <label htmlFor="subclass">Subclass: </label>
            <select id="characterSubclass" type="text" name="subclass" placeholder="Character Subclass">
                <option value="fire">Fire</option>
                <option value="water">Water</option>
            </select>
            
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className = "makeCharacterSubmit" type="submit" value="Make Character"/>
        </form>
    );
};

//Creates list with created characters
//Also adds upgrade button
const CharacterList = function(props) {
    if(props.characters.length === 0){
        return(
            <div className="characterList">
                <h3 className="emptyCharacter">No characters yet</h3>
            </div>
        );
    }

    const characterNodes = props.characters.map(function(character){
        return(
            <div key={character._id} className="character">
                {/* IMPORTANT */}
                {/* Needs to be changed to no longer ref domo */}
                <img src="/assets/img/domoface.jpeg" alt="character face" className="characterFace"/>
                <h3 className="characterName"> Name: {character.name}</h3>
                <h3 className="characterAge"> Age: {character.age}</h3>
                <h3 className="characterClass"> Class: {character.class}</h3>
                <h3 className="characterSubclass"> Subclass: {character.subclass}</h3>
                <h3 className="characterHealth"> Health: {character.health}</h3>
                <h3 className="characterDamage"> Damage: {character.damage}</h3>
                <h3 className="characterEXP"> EXP: {character.exp}</h3>

                <div className="activities">
                    {/* <button className="upgradeButton">Upgrade</button> */}
                </div>
            </div>
        );
    });

    return (
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />, document.querySelector("#characters")
        );
    });

    let select = document.querySelector("#characterSelect");
    //If no characters stays at default value
    //If characters available fills selection with them
    if(characters.length === 0)
    {
        return;
    } else {
        //Restarts select list
        select.innerHTML = ""

        //Fills it in
        for(let i=0; i > characters.length; i++)
        {
            let chara = characters[i].name;
            let option = document.createElement("option");
            option.innerHTML = chara;

            select.addEventListener(option);
        }
    }
};

// const handleTrainer = (e) => {
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

//Testing for Training room
const TrainWindow = (props) => {
    return (
        <form id="trainForm" 
            name="trainForm"
            //onSubmit={handleTrainer}
            action="/trainer"
            method="POST"
            className="trainForm"
        >

            <select id="characterSelect">
                <option value="none">No Characters</option>
            </select>

            <input className="formTrain" type="submit" value="Train"/>
            <p>Welcome to the Training Room</p>
        </form>
    );
};

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

const setup = function(csrf) {
    
    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );

    ReactDOM.render(
        <TrainWindow csrf={csrf} />, document.querySelector("#trainRoom")
    );

    
    loadCharactersFromServer();
    //fillTrainSelect();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});