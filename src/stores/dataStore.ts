import { defineStore } from 'pinia';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    userData: {
      currentUser: {
        image: { png: '', webp: '' },
        username: ''
      },
      comments: [] as any[]
    },
    isReady: false,
    IDindex: 5,
    isAddComment: false,
  }),
  actions: {
    async fetchData() {
      try {
        const response = await fetch('./data.json');
        const data = await response.json();
        this.userData = data;
        this.isReady = true;
      }
      catch (error) {
        console.error('Error fetching data:', error);
      } 
    },
    addComment(content: string, replyingTo: string | null = null, targetArray: any[]) {
      const newComment = {
        id: this.IDindex,
        content: content,
        createdAt: "Just now",
        score: 0,
        replyingTo: replyingTo,
        user: this.userData.currentUser,
        replies: []
      }
      targetArray.push(newComment);
      this.IDindex++;
    },
    createComment(content: string) {
      const newComment = {
        id: this.IDindex,
        content: content,
        createdAt: "Just now",
        score: 0,
        user: this.userData.currentUser,
        replies: []
      }
      this.userData.comments.push(newComment);
      this.IDindex++;
    }
  }
});