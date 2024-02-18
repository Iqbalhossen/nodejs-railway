const ConversationModel = require('../../models/Chat/ConversationModel');
const MessageModels = require('../../models/Chat/Message');


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
    const id = req.params.id;
    const ConversationData = await ConversationModel.findOne({ userId: id });
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
    const id = req.params.id;
    const data = req.body;
    const ExitsConversationData = await ConversationModel.findOne({ userId: id, });

    if (data?.recevierId === undefined) {
      if (ExitsConversationData) {
        const MessageData = await MessageModels.create({ conversationId: ExitsConversationData?._id, senderId: id, message: data?.message });
        res.status(201).json({
          success: true,
          ConversationData: ExitsConversationData,
          data: MessageData,
        });
      } else {
        const ConversationData = await ConversationModel.create({ userId: id, });
        if (ConversationData) {
          const MessageData = await MessageModels.create({ conversationId: ConversationData?._id, senderId: id, message: data?.message });
          res.status(201).json({
            success: true,
            ConversationData,
            data: MessageData,
          });
        }

      }

    } else {

      if (ExitsConversationData) {
        const MessageData = await MessageModels.create({ conversationId: ExitsConversationData?._id, senderId: data?.senderId, message: data?.message, recevierId: data?.recevierId });
        res.status(201).json({
          success: true,
          ConversationData: ExitsConversationData,
          data: MessageData,
        });
      } else {
        const ConversationData = await ConversationModel.create({ userId: id, });
        if (ConversationData) {
          const MessageData = await MessageModels.create({ conversationId: ConversationData?._id, senderId: data?.senderId, message: data?.message, recevierId: data?.recevierId });
          res.status(201).json({
            success: true,
            ConversationData,
            data: MessageData,
          });
        }

      }

    }

  } catch (error) {
    console.log(error);
  }
};





module.exports = { AdminConversationView, MessageView, MessageSend, };
