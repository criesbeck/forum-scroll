const app = Vue.createApp({
  data() {
    return { 
      users: [],
      posts: [],
      filter: '',
      showText: false
    }
  },
  methods: {
    hasPosts(user) {
      return this.posts.some(this.makeFilter(user));
    },
    postsFrom(user) {
      return this.posts.filter(this.makeFilter(user));
    },
    makeFilter(user) {
      const re = new RegExp(this.filter, 'i');
      return post => post.userId === user.id && re.test(post.title);
    },
    lastN(lst, n) {
      return lst.slice(Math.max(0, lst.length - n));
    },
    async fetchData() {
      this.users = await fetchJson('https://jsonplaceholder.typicode.com/users');
      this.posts = await fetchJson('https://jsonplaceholder.typicode.com/posts');
    }
  },
  created() {
    this.fetchData();
  }
});

const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.url} ${response.statusText}`)
    };
    
    return await response.json();
  } catch (error) {
    alert(error);
    return null;
  }
};

app.mount('#app');