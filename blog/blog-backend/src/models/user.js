import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose,{ Schema } from 'mongoose';


const UserSchema = new Schema({
    username:String,
    hashedPassword:String,
});


// 비밀번호를 파라미터로 받아서 hashedPassword 값을 설정해준다.
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password,10);
    this.hashedPassword = hash;
};

//파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검사
UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password,this.hashedPassword);
    return result; //boolean 타입으로 반환
}

// DB에서 username 찾음
UserSchema.statics.findByUsername =function (username) {
    return this.findOne({username});
}

// delete data.hashedPassword를 자주 작업하기 때문에 serialize 라는 인스턴스 함수를 따로 만들었다.
UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}


UserSchema.methods.generateToken =function(){
    const token = jwt.sign(
        // 첫번째 파라미터. 토큰안에 넣고 싶은 데이터
        {
            _id : this.id,
            username:this.username,
        },
        // 두번째 파라미터. JWT 암호를 넣는다.
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',  // 7일동안 유효함
        },
    );
    return token;
};
const User = mongoose.model('User',UserSchema);
export default User;