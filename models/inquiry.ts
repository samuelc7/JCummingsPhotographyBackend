import { Schema, model } from "mongoose";

interface IInquiry {
    firstName: string;
    lastName: string;
    phone: string;
    serviceType: string;
    email: string;
    eventDate: Date;
    dateFlexible: boolean;
}

const inquirySchema = new Schema<IInquiry>({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName:  {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    dateFlexible: {
        type: Boolean,
        required: true
    }
});

const Inquiry = model<IInquiry>("Inquiry", inquirySchema);

export default Inquiry;