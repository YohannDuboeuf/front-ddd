<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <div class="mb-4">
          <button
            @click="mode = 'login'"
            :class="mode === 'login' ? 'font-bold' : ''"
            class="mr-4"
          >
            Login
          </button>
          <button
            @click="mode = 'register'"
            :class="mode === 'register' ? 'font-bold' : ''"
          >
            Register
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            class="border p-2 rounded"
            required
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="border p-2 rounded"
            required
          />
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">
            {{ mode === 'login' ? 'Login' : 'Register' }}
          </button>
        </form>
        <div v-if="error" class="text-red-500 mt-2">
          {{ error }}
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        mode: 'login',
        form: {
          username: '',
          password: ''
        },
        error: ''
      };
    },
    methods: {
        async handleSubmit() {
            this.error = '';
            try {
                const formData = new FormData();
                formData.append('username', this.form.username);
                formData.append('password', this.form.password);

                const response = await fetch(`http://localhost:8000/users/${this.mode}/`, {
                method: 'POST',
                body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    this.error = data.message || 'Something went wrong.';
                } else {

                    alert(`${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)} successful!`);
                    localStorage.setItem('username', this.form.username)
                    localStorage.setItem('token', data.access)
                    window.location.reload()
                }
            } catch (err) {
                this.error = 'Failed to connect to the server.';
            }
        }
    }
  };
</script>
