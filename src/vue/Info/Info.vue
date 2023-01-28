<template>
    <div class="info-container">
        <div class="info">
            <div class="info__inner">
                <div class="info__items">
                    <div v-for="item in infoItems" :key="item.name">
                        <div class="info__item-icon">
                            <span class="info__item-icon-inner">
                                <span aria-hidden="true">{{ item.id }}</span>
                            </span>
                        </div>
                        <div class="info__item-content">
                            <h3 class="info__item-name">{{ item.name }}</h3>
                            <p class="info__item-description" v-html="item.description"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {},
    setup() {
        const infoItems = ref([
            {
                id: 1,
                name: 'Save the Date',
                description:
                    'The countdown to Samsonite’s Black Friday Sales is on!<br/>Be sure to check back for the best Black Friday Deals on suitcases and bags.'
            },
            {
                id: 2,
                name: 'When is Black Friday 2023?',
                description:
                    'This year, Black Friday occurs on <b>24 November 2023</b>.<br/>Save this date and you’ll be guaranteed some fantastic discounts on selected Samsonite products.'
            },
            {
                id: 3,
                name: 'What is Black Friday?',
                description:
                    'Black Friday is one of the most popular shopping days of the year with several retailers and brands offering huge discounts, deals and promotions. Originating in the USA, Black Friday occurs on the 4th Friday in November – the day after Thanksgiving in America – and marks the start of the Christmas shopping period.'
            }
        ]);

        return {
            infoItems
        };
    }
};
</script>

<style lang="scss" scoped>
@import './Info.scss';
</style>