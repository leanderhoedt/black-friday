<template>
    <div class="newsletter-container">
        <div class="newsletter">
            <h1 class="newsletter__heading">Can't wait until Black Friday?</h1>
            <p class="newsletter__description">
                Sign up to our VIP newsletter and we’ll let you know when our Black Friday pre-sale
                starts! Plus you’ll always be kept up to date with the latest sales and promotions
                throughout the year with exclusive access to private sales and special discounts.
            </p>
            <form class="newsletter__form" @submit.prevent="subscribe">
                <div class="newsletter__group newsletter__group--center">
                    <div class="newsletter__control">
                        <label class="newsletter__label newsletter__label--hiden" for="email">
                            Email
                        </label>
                        <input
                            ref="emailInput"
                            class="newsletter__input"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            v-model="email"
                            @focus="onEmailFocus"
                            required
                        />
                    </div>
                    <button type="submit" class="newsletter__submit" :disabled="isSubmitted">
                        <svg
                            v-if="!isSubmitted"
                            viewBox="0 0 24 24"
                            class="newsletter__submit-icon"
                        >
                            <polygon points="5 3 19 12 5 21" fill="currentColor" />
                        </svg>
                        <svg v-if="isSubmitted" viewBox="0 0 24 24" class="newsletter__submit-icon">
                            <polyline
                                points="20 6 9 17 4 12"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            />
                        </svg>
                    </button>
                </div>
                <p v-if="isSubmitted && !errorMessage">Thanks for subscribing!</p>
                <p v-if="errorMessage" class="newsletter__error">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const emailInput = ref();
        const email = ref('');
        const isSubmitted = ref(false);
        const errorMessage = ref('');

        /**
         * Subscription to newsletter, which does a POST to /api/newsletter with emailAddress as payload
         * Enable/disable the button based on isSubmitted
         * Show error message when needed
         */
        const subscribe = async () => {
            try {
                const { data } = await axios.post('/api/newsletter', {
                    emailAddress: email.value
                });
                if (data.success) {
                    // If we come here, we can suggest the subscription was successful so we can remove focus from emailInput
                    isSubmitted.value = true;
                    errorMessage.value = '';
                    emailInput.value.blur();
                } else if (data.errorMessage === 'EXISTING_USER') {
                    // Show message to user that email address is already registered
                    errorMessage.value = 'This email address is already subscribed.';
                }
            } catch (error) {
                errorMessage.value = 'Something went wrong when trying to subscribe!';
            }
        };

        // When the email input is focused, isSubmitted is set to false in order to enable the submitting of the form, after a submit already had been taken place
        // else remove error message
        const onEmailFocus = () => {
            isSubmitted.value = false;
            errorMessage.value = '';
        };

        return {
            emailInput,
            email,
            errorMessage,
            isSubmitted,
            onEmailFocus,
            subscribe
        };
    }
};
</script>

<style lang="scss" scoped>
@import './Newsletter.scss';
</style>