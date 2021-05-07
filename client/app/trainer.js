// Creates a window to train characters
const createTrainWindow = (props) => {
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