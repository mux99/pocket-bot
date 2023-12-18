<div>
    <div id="mainDiv">
        <h1>Main title</h1>
        <h2>Second title</h2>
        <form id="formTest">
            <label for="txt">Label text</label>
            <input type="text" placeholder="the placeholder">
            <br>
            <button type="submit" id="basic-button">basic button</button>
            <button type="submit" id="green-button">green button</button>
            <button type="submit" id="red-button">red button</button>
        </form>
    </div>
    <a href="tmp">Its a link</a>
</div>

<style>
    div {
        background-color: var(--background-3);
        text-align: center
    }
    #green-button {
        background-color: var(--green);
    }
    #red-button {
        background-color: var(--red);
    }
    form {
        display: inline-block;
    }
</style>