<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-file
        v-model="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      />
      <b-container
        fluid
        class="p-4"
      >
        <b-img
          v-if="preview !== null"
          fluid-grow
          :src="preview"
        />
      </b-container>
      <b-button
        type="submit"
        variant="primary"
      >
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      preview: null,
    };
  },
  watch: {
    file() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.preview = reader.result;
      })
      if (this.file) {
        reader.readAsDataURL(this.file);
      } else {
        this.preview = null;
      }
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(event);
      console.log(this.file);

      let data = new FormData();
      data.append("file", this.file);
      
      axios.post("/api/photos/", data)
      .then(() => {
        console.log('success');
        this.$emit("uploaded");
      })
      .catch(err => {
        console.log(err);
      });
    },
  },
};
</script>
