<template>
  <div class="pdf-download-container">
    <button
      class="btn btn-primary download-pdf-button"
      :disabled="isGenerating"
      @click="downloadPdf"
    >
      <i v-if="!isGenerating" class="fa-solid fa-file-pdf"></i>
      <i v-if="isGenerating" class="fa-solid fa-spinner fa-spin"></i>
      {{ isGenerating ? 'Generating PDF...' : buttonText }}
    </button>
    <div v-if="errorMessage" class="pdf-error alert alert-danger mt-2">
      {{ errorMessage }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="errorMessage = ''"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PdfDownload',
  props: {
    filename: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'Download as PDF',
    },
  },
  data() {
    return {
      isGenerating: false,
      errorMessage: '',
    };
  },
  methods: {
    downloadPdf() {
      this.isGenerating = true;
      this.errorMessage = '';

      // Get current URL
      const currentUrl = window.location.href;

      // Generate a clean filename if not provided
      const filenameToUse = this.filename
          || `${document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

      fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: currentUrl,
          filename: filenameToUse,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || 'Failed to generate PDF');
            });
          }
          return response.blob();
        })
        .then((blob) => {
          // Create download link and trigger download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = filenameToUse;
          document.body.appendChild(a);
          a.click();

          // Clean up
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }, 100);

          this.isGenerating = false;
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
          this.errorMessage = error.message || 'Failed to generate PDF';
          this.isGenerating = false;
        });
    },
  },
};
</script>

<style scoped>
.pdf-download-container {
  margin: 1rem 0;
}

.download-pdf-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.download-pdf-button i {
  font-size: 1rem;
}

.pdf-error {
  font-size: 0.9rem;
  position: relative;
  padding-right: 2rem;
}

.pdf-error .close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.2rem;
}
</style>
