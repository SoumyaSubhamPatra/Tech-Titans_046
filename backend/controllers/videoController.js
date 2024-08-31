const Room = require('../models/Room');

exports.addVideoLink = async (req, res) => {
    const { roomId, link } = req.body;

    try {
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ msg: 'Room not found' });

        if (room.owner.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Only the room owner can add the video link' });
        }

        room.videoLink = link;
        await room.save();
        res.json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
