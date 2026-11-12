<script setup lang="ts">
import { computed, ref } from "vue";

type SubmissionState = "idle" | "sending" | "sent" | "failed";

const endpoint = import.meta.env.VITE_STONE_SUBMISSION_ENDPOINT?.trim() ?? "";
const inboxReady = endpoint.length > 0;

const title = ref("");
const text = ref("");
const byline = ref("");
const privateReviewConfirmed = ref(false);
const publicationPermission = ref(false);
const submissionState = ref<SubmissionState>("idle");
const statusMessage = ref("");

const canSubmit = computed(
  () =>
    inboxReady &&
    text.value.trim().length > 0 &&
    privateReviewConfirmed.value &&
    submissionState.value !== "sending",
);

async function submitStone() {
  if (!canSubmit.value) {
    return;
  }

  submissionState.value = "sending";
  statusMessage.value = "Sending your stone privately for review…";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value.trim(),
        text: text.value.trim(),
        byline: byline.value.trim(),
        privateReviewConfirmed: privateReviewConfirmed.value,
        publicationPermission: publicationPermission.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`Submission endpoint returned HTTP ${response.status}.`);
    }

    submissionState.value = "sent";
    statusMessage.value =
      "Your stone was received by the private review service. It has not been published; accepted stones are added by hand.";
    title.value = "";
    text.value = "";
    byline.value = "";
    privateReviewConfirmed.value = false;
    publicationPermission.value = false;
  } catch (error) {
    console.error("Stone submission failed.", error);
    submissionState.value = "failed";
    statusMessage.value =
      "The stone could not be delivered. It has not been published; please try again later.";
  }
}
</script>

<template>
  <section class="stone-form" aria-labelledby="stone-form-title">
    <h2 id="stone-form-title">Leave a Stone</h2>
    <p>
      A thought, question, observation, or small encounter is enough. You do not
      need to read the whole archive or make the stone polished.
    </p>

    <p class="stone-form__notice">
      When enabled, Formspree receives each stone and emails the private review
      inbox. It may retain a copy under its
      <a href="https://formspree.io/legal/privacy-policy">privacy policy</a>.
      Nothing is published unless accepted and added by hand. Public copies may
      be viewed or forked under GitHub's terms.
    </p>

    <p v-if="!inboxReady" class="stone-form__notice" role="status">
      The private inbox is still being prepared. You cannot leave a stone here
      yet.
    </p>

    <form class="stone-form__fields" @submit.prevent="submitStone">
      <fieldset :disabled="!inboxReady || submissionState === 'sending'">
        <div class="stone-form__field">
          <label for="stone-title">A title, if you wish</label>
          <input
            id="stone-title"
            v-model="title"
            name="title"
            type="text"
            maxlength="100"
            autocomplete="off"
          />
        </div>

        <div class="stone-form__field">
          <label for="stone-text">Your stone</label>
          <textarea
            id="stone-text"
            v-model="text"
            name="text"
            maxlength="10000"
            required
            aria-describedby="stone-text-help"
          />
          <span id="stone-text-help" class="stone-form__help">
            You can leave it in your own words. Please do not include sensitive
            personal information or confidential details about yourself or
            anyone else.
          </span>
        </div>

        <div class="stone-form__field">
          <label for="stone-byline">A byline, if you want one</label>
          <input
            id="stone-byline"
            v-model="byline"
            name="byline"
            type="text"
            maxlength="100"
            autocomplete="off"
            placeholder="A name, an alias, or leave blank"
          />
        </div>

        <fieldset class="stone-form__permission">
          <legend class="stone-form__legend">Before sending</legend>
          <label class="stone-form__check">
            <input
              v-model="privateReviewConfirmed"
              name="privateReviewConfirmed"
              type="checkbox"
              required
            />
            <span>
              I understand this goes to private review, not automatic
              publication.
            </span>
          </label>
          <label class="stone-form__check">
            <input
              v-model="publicationPermission"
              name="publicationPermission"
              type="checkbox"
            />
            <span>
              I am authorized to allow public inclusion if this stone is
              accepted. If I leave this unchecked, publication permission will
              need to be confirmed before it can appear.
            </span>
          </label>
        </fieldset>

        <button class="stone-form__submit" type="submit" :disabled="!canSubmit">
          {{ submissionState === "sending" ? "Placing…" : "Place this stone" }}
        </button>
      </fieldset>
      <p class="stone-form__status" role="status" aria-live="polite">
        {{ statusMessage }}
      </p>
    </form>

    <p class="stone-form__help">
      No account or email address is required. There is no promise of
      publication or a response.
    </p>
  </section>
</template>
