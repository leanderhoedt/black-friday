<template>
    <div class="countdown">
        <div class="countdown__item">
            <div class="countdown__square countdown__square--days">
                {{ formattedDays }}
            </div>
            <div class="countdown__label">DAYS</div>
        </div>
        <div class="countdown__item">
            <div class="countdown__square countdown__square--hours">
                {{ formattedHours }}
            </div>
            <div class="countdown__label">HOURS</div>
        </div>
        <div class="countdown__item">
            <div class="countdown__square countdown__square--minutes">
                {{ formattedMinutes }}
            </div>
            <div class="countdown__label">MIN</div>
        </div>
        <div class="countdown__item">
            <div class="countdown__square countdown__square--seconds">
                {{ formattedSeconds }}
            </div>
            <div class="countdown__label">SEC</div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

export default {
    props: {
        countdownEnd: {
            type: Number,
            required: true
        }
    },
    setup({ countdownEnd }) {
        const days = ref(0);
        const hours = ref(0);
        const minutes = ref(0);
        const seconds = ref(0);
        const countdownInterval = ref(null);

        onMounted(() => {
            // Updating the countdown on mount (in order to show countdown instantly)
            updateCountdown();
            // Setting the interval to 1000 milliseconds.
            countdownInterval.value = setInterval(() => {
                updateCountdown();
            }, 1000);
        });

        onBeforeUnmount(() => {
            // Clearing the interval that is set in the `onMounted` hook.
            clearInterval(countdownInterval.value);
        });

        const updateCountdown = () => {
            let distance = countdownEnd - new Date().getTime();
            days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
        };

        const formattedDays = computed(() => {
            return days.value < 10 ? `0${days.value}` : days.value;
        });
        const formattedHours = computed(() => {
            return hours.value < 10 ? `0${hours.value}` : hours.value;
        });
        const formattedMinutes = computed(() => {
            return minutes.value < 10 ? `0${minutes.value}` : minutes.value;
        });
        const formattedSeconds = computed(() => {
            return seconds.value < 10 ? `0${seconds.value}` : seconds.value;
        });

        return {
            formattedDays,
            formattedHours,
            formattedMinutes,
            formattedSeconds
        };
    }
};
</script>

<style lang="scss" scoped>
@import './Countdown.scss';
</style>