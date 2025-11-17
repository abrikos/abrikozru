import mongoose from 'mongoose';
import moment from "moment";

const model = 'post'

export interface IPost extends mongoose.Document {
    title: string;
    text: string;
    user: IUser
    createdAt: Date
}

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    text: {type: String},
}, {
    toObject: {virtuals: true},
    timestamps: {createdAt: 'createdAt'},
    // use if your results might be retrieved as JSON
    // see http://stackoverflow.com/q/13133911/488666
    toJSON: {virtuals: true}
})

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })

export const PostModel = mongoose.model<IToken, TokenModel>(model, schema)
