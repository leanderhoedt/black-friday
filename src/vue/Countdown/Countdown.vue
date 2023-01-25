<template>
<h1>{{ title }}</h1>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        }
    }
};
</script>

<style lang="scss" scoped>
@import './Countdown.scss';
</style>