const { select } = require("underscore");

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
};

const setup = function(csrf) {
    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );

    loadCharactersFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});