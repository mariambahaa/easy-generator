<script setup lang="ts">
const year = new Date().getFullYear();

const legalLinks = [
  { text: "Privacy", href: "https://www.easygenerator.com/en/privacy-policy/" },
  { text: "Terms", href: "https://www.easygenerator.com/en/terms-of-service/" },
];

const socials = [
  {
    icon: "mdi-linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/easygenerator/",
  },
  {
    icon: "mdi-twitter",
    label: "X (Twitter)",
    href: "https://twitter.com/easygenerator",
  },
  {
    icon: "mdi-youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@easygenerator",
  },
];
</script>

<template>
  <v-footer app :height="80" density="comfortable" elevation="1">
    <v-container>
      <v-row class="py-4" align="center">
        <!-- Left: Copyright -->
        <v-col cols="12" md="4" class="text-caption text-medium-emphasis">
          © {{ year }} Easygenerator. All rights reserved.
        </v-col>

        <!-- Center: Socials -->
        <v-col cols="12" md="4" class="d-flex justify-center ga-3">
          <template v-for="s in socials" :key="s.icon">
            <v-btn
              :aria-label="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              variant="plain"
              density="comfortable"
              :icon="s.icon"
            />
          </template>
        </v-col>

        <!-- Right: Legal -->
        <v-col cols="12" md="4" class="d-flex justify-end ga-3">
          <template v-for="l in legalLinks" :key="l.text">
            <v-btn
              :href="l.href"
              target="_blank"
              rel="noopener"
              variant="plain"
              density="comfortable"
              class="text-caption"
            >
              {{ l.text }}
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
