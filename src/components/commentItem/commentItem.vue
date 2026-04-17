<script setup lang="ts">
  const props = defineProps<{
  comment: any
  currentUser: any
  index: number
  parentArray: any
}>();
  import plus from '/public/images/icon-plus.svg';
  import minus from '/public/images/icon-minus.svg';
  import reply from '/public/images/icon-reply.svg';
  import deleteIcon from '/public/images/icon-delete.svg';
  import editIcon from '/public/images/icon-edit.svg';
  import { ref } from 'vue';
  import { useDataStore } from '../../stores/dataStore';
  import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

  const isReplying = ref(false);
  const editMode = ref(false);
  const replyContent = ref(``);
  const editComment = ref(props.comment.content);
  const dataStore = useDataStore();
  const vote = ref("");
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isDesktop = breakpoints.greater('lg');
  const doubleCheck = ref(false);

  const openReplyInput = () => {
    isReplying.value = true;
  };

  const closeReplyInput = () => {
    isReplying.value = false;
    replyContent.value = ` `;
  };

  const submitReply = () => {
    dataStore.addComment(
      replyContent.value,
      props.comment.user.username,
      props.comment.replies
    );
  };

  const enterEditMode = () => {
    editMode.value = true;
  };

  const updateComment = () => {
    editMode.value = false;
    props.comment.content = editComment.value;
  }

  const deleteComment = () => {
    props.parentArray.splice(props.index, 1);
    dataStore.isAddComment = false;
  }
  const upvote = () => {
    if (vote.value === "") {
      props.comment.score++;
      vote.value = "upvoted";
    } else if(vote.value === "upvoted") {
      props.comment.score--;
      vote.value = "";
    }
  }
  const downvote = () => {
    if (vote.value === "") {
      props.comment.score--;
      vote.value = "downvoted";
    } else if(vote.value === "downvoted") {
      props.comment.score++;
      vote.value = "";
    }
  }

  const hoggleDoubleCheck = () => {
    doubleCheck.value = !doubleCheck.value;
  }
</script>
<template>
  <section class="container" v-if="isDesktop">
    <div class="likeBtn">
        <button type="button" class="interactionBtn" @click="upvote"><img :src="plus" alt="plusIcon"></button>
        <p class="likeNum">{{ comment.score }}</p>
        <button type="button" class="interactionBtn" @click="downvote"><img :src="minus" alt="minusIcon"></button>
    </div>
    <div class="mainContent">
      <div class="mainContentHeader">
        <div class="userInfo">
          <img :src="comment.user.image.webp" alt="userImage" class="userImage">
          <h4>{{ comment.user.username }}</h4>
          <p v-if="currentUser.username === comment.user.username" class="mainUserMark">you</p>
          <p class="content">{{ comment.createdAt }}</p>
        </div>
        <div>
          <div v-if="currentUser.username === comment.user.username && !editMode" class="editDeleteBtn">
            <button type="button" class="miniBtn" @click="hoggleDoubleCheck">
              <img :src="deleteIcon" alt="deleteIcon" class="miniIcon">
              <span class="deleteSpan">Delete</span>
            </button>
            <button type="button" class="miniBtn" @click="enterEditMode">
              <img :src="editIcon" alt="editIcon" class="miniIcon">
              <span>Edit</span>
            </button>
          </div>
          <button type="button" class="miniBtn" v-if="currentUser.username !== comment.user.username" @click="openReplyInput">
            <img :src="reply" alt="replyIcon" class="miniIcon">
            <span>Reply</span>
          </button>
        </div>
      </div>
      <textarea v-if="editMode" class="replyInput" v-model="editComment"></textarea>
      <p v-else-if="comment.replyingTo" class="content"><span class="replyTo">@{{ comment.replyingTo }}</span> {{ comment.content }}</p>
      <p v-else class="content">{{ comment.content }}</p>
      <div class="interaction">
        <div v-if="currentUser.username === comment.user.username && editMode">
          <button type="button" class="replyBtn" @click="updateComment">
            <span>Update</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="container" v-else>
    <div class="userInfo">
      <img :src="comment.user.image.webp" alt="userImage" class="userImage">
      <h4>{{ comment.user.username }}</h4>
      <p v-if="currentUser.username === comment.user.username" class="mainUserMark">you</p>
      <p class="content">{{ comment.createdAt }}</p>
    </div>
    <textarea v-if="editMode" class="replyInput" v-model="editComment"></textarea>
    <p v-else-if="comment.replyingTo" class="content"><span class="replyTo">@{{ comment.replyingTo }}</span> {{ comment.content }}</p>
    <p v-else class="content">{{ comment.content }}</p>
    <div class="interaction">
      <div class="likeBtn">
        <button type="button" class="interactionBtn" @click="upvote"><img :src="plus" alt="plusIcon"></button>
        <p class="likeNum">{{ comment.score }}</p>
        <button type="button" class="interactionBtn" @click="downvote"><img :src="minus" alt="minusIcon"></button>
      </div>
      <div v-if="currentUser.username === comment.user.username && !editMode" class="editDeleteBtn">
        <button type="button" class="miniBtn" @click="hoggleDoubleCheck">
          <img :src="deleteIcon" alt="deleteIcon" class="miniIcon">
          <span class="deleteSpan">Delete</span>
        </button>
        <button type="button" class="miniBtn" @click="enterEditMode">
          <img :src="editIcon" alt="editIcon" class="miniIcon">
          <span>Edit</span>
        </button>
      </div>
      <div v-else-if="currentUser.username === comment.user.username && editMode">
        <button type="button" class="replyBtn" @click="updateComment">
          <span>Update</span>
        </button>
      </div>
      <button type="button" class="miniBtn" v-else @click="openReplyInput">
        <img :src="reply" alt="replyIcon" class="miniIcon">
        <span>Reply</span>
      </button>
    </div>
  </section>
  <section class="container" v-if="isReplying">
    <div class="replyInputWrapper">
      <img :src="currentUser.image.webp" alt="userImage" class="replyUserImage">
      <textarea name="reply" id="reply" class="replyInput" v-model="replyContent">{{ replyContent }} </textarea>
      <div class="controlBtn">
        <button type="button" class="replyBtn" @click="submitReply(); closeReplyInput()">REPLY</button>
        <button type="button" class="replyBtn redBtn" @click="closeReplyInput">CANCEL</button>
      </div>
    </div>
  </section>
  <div v-if="comment.replies && comment.replies.length > 0" class="replies-wrapper">
    <commentItem
      v-for="(reply, index) in comment.replies" 
      :key="reply.id" 
      :comment="reply" 
      :currentUser="currentUser"
      :index="Number(index)"
      :parentArray="comment.replies"
    />
  </div>
  <Teleport to="#app">
    <div class="doubleCheck" v-if="doubleCheck">
      <div class="doubleCheckContent">
        <h3>Delete comment</h3>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div class="doubleCheckBtn">
          <button type="button" class="checkBtn" @click="hoggleDoubleCheck">NO, CANCEL</button>
          <button type="button" class="checkBtn redBtn" @click="deleteComment">YES, DELETE</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  @import './commentItem.css';
</style>