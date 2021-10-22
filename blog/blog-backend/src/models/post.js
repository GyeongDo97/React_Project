import mongoose,{ Schema } from 'mongoose';

// 스키마를 만들 때 mongoose 모듈의 Schema를 사용하여 정의할 수 있게 사용
// const { Schema } = mongoose;

// 각 필드 이름과 데이터 타입을 작성
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  user:{
    _id : mongoose.Types.ObjectId,
    username:String,
  }
  
});

// 모델 인스턴스 생성
const Post = mongoose.model('Post', PostSchema);
// 외부에서 사용하게 내보내기
export default Post;
