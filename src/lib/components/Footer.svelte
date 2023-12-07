<script>
    import {page} from "$app/stores";
</script>

<footer>
    <div
            id={$page.url.pathname.startsWith("/parts/new") ? "selected" : ""}
            class="footer-button"
            data-testid="footer-parts-div"
    >
        <a href="/parts/new">
            <img src="/footer/play_part.svg" alt="a white play button" class="footer-button-image">
        </a>
    </div>
    <div
            id={$page.url.pathname.startsWith("/friends") ? "selected" : ""}
            class="footer-button"
            data-testid="footer-friends-div"
    >
        <a href="/friends">
            <img src="/footer/friends.svg" alt="a group of 3 person to represents the friends" class="footer-button-image">
        </a>
    </div>
    <div
            id={$page.url.pathname.startsWith("/profil") ? "selected" : ""}
            class="footer-button"
            data-testid="footer-profil-div"
    >
        <a href="/profile">
            <img src="/footer/profil.svg" alt="a single person to represent the profil" class="footer-button-image">
        </a>
    </div>

</footer>

<style>
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        margin: 1em;
    }

    #selected {
        background-color: #000B1D;
    }

    .footer-button {
        display: inline-block;
        padding: 0.3em 1.8em 0.3em 1.8em;
        border-radius: 1.2em;
    }

    .footer-button-image {
        max-width: 50px;
        max-height: 50px;
    }
</style>