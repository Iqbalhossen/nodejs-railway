const ConversationModel = require('../../models/Chat/ConversationModel');
const MessageModels = require('../../models/Chat/Message');
const { AdminLiveChatEmail } = require('../../commonfile/email/LiveChatEmail');
const { ObjectId } = require('mongodb');

const AdminConversationView = async (req, res) => {
  try {
    const ConversationData = await ConversationModel.find();
    res.status(201).json({
      success: true,
      data: ConversationData,
    });
  } catch (error) {
    console.log(error);
  }
};

const MessageView = async (req, res) => {
  try {
    const email = req.params.id;
    const ConversationData = await ConversationModel.findOne({ user_email: email });
    if (ConversationData) {
      const data = await MessageModels.find({ conversationId: ConversationData?._id });
      res.status(201).json({
        success: true,
        ConversationData,
        data,
      });
    }

  } catch (error) {
    console.log(error);
  }
};


const MessageSend = async (req, res) => {
  try {
    const email = req.params.id;
    const data = req.body;
    const ExitsConversationData = await ConversationModel.findOne({ user_email: email, });
    if (data?.message === undefined) {
      if (ExitsConversationData) {
        res.status(201).json({
          success: true,
          ConversationData: ExitsConversationData,
        });

      } else {
        const ConversationDataStore = { fname: data?.fname, lname: data?.lname, user_email: email, }
        const ConversationData = await ConversationModel.create(ConversationDataStore);
        res.status(201).json({
          success: true,
          ConversationData: ConversationData,
        });
      }


    } else {

      if (data?.recevier_email === undefined) {

        if (ExitsConversationData?.status === 2) {
          const query = { _id: new ObjectId(ExitsConversationData?._id) };
          const option = { upsert: true };

          await ConversationModel.findByIdAndUpdate(query, { status: 0 }, option);
          ///////////email send admin
          AdminLiveChatEmail(ExitsConversationData);
          ///////////email send admin end

        } else {
          ///////////email send admin
          if (ExitsConversationData?.status === 0) {
            AdminLiveChatEmail(ExitsConversationData);
          }
          ///////////email send admin end

        }

        const MessageData = await MessageModels.create({ conversationId: ExitsConversationData?._id, sender_email: email, message: data?.message });
        res.status(201).json({
          success: true,
          ConversationData: ExitsConversationData,
          data: MessageData,
        });

      } else {

        const messageDataStore = { conversationId: ExitsConversationData?._id, sender_email: data?.sender_email, message: data?.message, recevier_email: data?.recevier_email }

        const MessageData = await MessageModels.create(messageDataStore);
        res.status(201).json({
          success: true,
          ConversationData: ExitsConversationData,
          data: MessageData,
        });

      }

    }



  } catch (error) {
    console.log(error);
  }
};





module.exports = { AdminConversationView, MessageView, MessageSend, };
