<template>
  <div class="hello">
    <input type="file" id="file" @change="handleFileUpload($event)" />
    <p v-if="odds.length !== 0">
      the odds of getting caught by the empire: {{ odds }}%
    </p>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    msg: String,
  },
})
export default class Empire extends Vue {
  odds = "";

  apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
  });

  handleFileUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        let fileContent: string = e.target?.result as string;
        this.apiClient
          .post("http://localhost:3000/odds", JSON.parse(fileContent))
          .then((res: AxiosResponse) => {
            this.odds = res.data;
          });
      };

      reader.readAsText(input.files[0]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
