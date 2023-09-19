<template>
    <nav>
        <ul>
            <li><router-link to="/">Me</router-link></li>
            <li><router-link to="/CreateTicket">Tåg</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: {}
}
</script>
