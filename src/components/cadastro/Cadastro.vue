<template>
  <div>
    <!-- 
    <h1 v-if="foto._id" class="centralizado">Atualização</h1>
    <h1 v-else class="centralizado">Cadastro</h1> -->

    <h1 class="centralizado">{{ tituloPagina }}</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(grava)">
        <!-- Antes de usar o v-model o código estava:
          @input="foto.url = $event.target.value"
          :value="foto.url" -->

        <ValidationProvider
          class="controle"
          rules="required"
          name="titulo"
          v-slot="{ errors }"
        >
          <label class="label" for="titulo">FOTO</label>
          <input
            class="input"
            id="titulo"
            type="text"
            autocomplete="off"
            v-model="foto.titulo"
            placeholder="Nome da foto"
          />

          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          class="controle"
          rules="required|urlImage"
          name="foto"
          mode="lazy"
          v-slot="{ errors }"
        >
          <label class="label" for="foto">FOTO</label>
          <input
            class="input"
            id="foto"
            type="text"
            autocomplete="off"
            v-model="foto.url"
            placeholder="Url da foto"
          />

          <imagem-responsiva v-show="urlValid" :url="foto.url" />
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          class="controle"
          rules="required"
          name="descricao"
          v-slot="{ errors }"
        >
          <label class="label" for="descricao">DESCRIÇÃO</label>

          <textarea
            class="textarea"
            id="descricao"
            autocomplete="off"
            v-model="foto.descricao"
            placeholder="Descrição da foto"
            maxlength="184"
          >
          </textarea>

          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="centralizado">
          <meu-botao :rotulo="updateOrCreate" tipo="submit" />
          <router-link :to="{ name: 'home' }">
            <meu-botao rotulo="VOLTAR" tipo="button" />
          </router-link>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";

//Regras de validação
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);

extend("urlImage", (value) => {
  var img = new Image();
  img.src = value;
  if (img.height > 0) {
    return true;
  }
  return "Url inválida";
});

export default {
  components: {
    "meu-botao": Botao,
    "imagem-responsiva": ImagemResponsiva,
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id,
      mensagem: "",
    };
  },

  methods: {
    grava() {
      this.service.cadastra(this.foto).then(
        () => {
          if (this.id) {
            this.$router.push({ name: "home" });
            return;
          }
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return;
            }

            alert("O formulário foi cadastrado!");

            // Resetting Values
            this.foto = new Foto();

            // Wait until the models are updated in the UI
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          });
        },
        (err) => (this.mensagem = err.message)
      );
    },
  },

  computed: {
    updateOrCreate() {
      return this.id ? "ALTERAR" : "GRAVAR";
    },

    tituloPagina() {
      return this.id ? "Atualização" : "Cadastro";
    },

    urlValid() {
      var img = new Image();
      img.src = this.foto.url;
      if (img.height > 0) {
        return true;
      }
      return false;
    },
  },

  created() {
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.busca(this.id).then((foto) => (this.foto = foto));
    }
  },
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}

.controle {
  font-size: 1rem;
  margin-bottom: 20px;
}

.label {
  display: block;
  font-weight: bold;
  color: black;
}

.input,
.textarea {
  width: 100%;
  border-radius: 5px;
  border: 2px solid black;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.textarea {
  resize: none;
}

.error {
  display: block;
  margin-top: 0.1rem;
  margin-bottom: 0.6rem;
  font-size: 0.6rem;
  color: #f22435;
}

.centralizado {
  text-align: center;
}
</style>