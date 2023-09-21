<template>
    <nav>
        <ul class="nav-container">
            <li><router-link to="/">Me</router-link></li>
            <!-- <li><router-link to="/create-ticket">Tåg</router-link></li> -->
        </ul>
    </nav>
</template>

<script>



export default {
    name: 'NavBar',
    props: {}
}
</script>

<style>
nav {
    padding: 0;
    margin: 0;
    width: 100%;
    background-color: rgb(77, 77, 77);
    height: 8vh
}

.nav-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 2em;
    margin: 0 10vw;
}

.nav-container a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
    text-decoration: none;
    color: white;
    height: 100%;
    width: 10vh;
}

.nav-container a:hover {
    color: rgba(20, 20, 20, 0.322);
    background-color: rgba(255, 255, 255, 0.493);
}

.nav-container li {
    list-style-type: none;
    height: 100%;
    width: 10vh;
}
</style>