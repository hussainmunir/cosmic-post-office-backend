const addMessgeAuth = async (
  senderId,
  receiverId,
  senderName,
  receiverName
) => {
  if (!senderId || !receiverId || !senderName || !receiverName) {
    throw Error('All field must require')
  }
  return;
};

module.exports = {
  addMessgeAuth,
};
