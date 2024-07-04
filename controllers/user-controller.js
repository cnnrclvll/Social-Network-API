const { User, Thought } = require('../models');
// ----------------------- //
// *** user control *** //
// ----------------------- //
// mongoose methods to create, retrieve, update, and delete data
const userControl = {
  // ---------------- //
  // --- FIND ALL --- //
  // ---------------- //
  // exclude document version field from response
  async findAllUser(req, res) {
    try {
      const userData = await User.find()
        .select('-__v')

      res.json(userData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ---------------- //
  // --- FIND ONE --- //
  // ---------------- //
  // exclude document version field from response
  // include user objects in friends array
  // include thought objects in thoughts array
  async findOneUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!userData) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json(userData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ---------------- //
  // --- NEW USER --- //
  // ---------------- //
  // pass user object through req body
  async newUser(req, res) {
    try {
      const userData = await User.create(req.body);

      res.json(userData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ----------------- //
  // --- EDIT USER --- //
  // ----------------- //
  // match userId from params
  // set user values from req body
  // validate data and log result
  async editUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json(userData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ------------------- //
  // --- DELETE USER --- //
  // ------------------- //
  // match userId from params
  // delete all thoughts whose id is in user's thoughts array
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ 
        _id: req.params.userId 
      })

      if (!userData) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await Thought.deleteMany({ 
        _id: { $in: userData.thoughts } 
      });

      res.json({ message: 'User and cooresponding thoughts were deleted successfully.' });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // ------------------ //
  // --- NEW FRIEND --- //
  // ------------------ //
  // match userId from params
  // add friendId from params to user's friends array
  // log result
  async newFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $addToSet: { friends: req.params.friendId } }, 
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json(userData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // --------------------- //
  // --- REMOVE FRIEND --- //
  // --------------------- //
  // match userId from params
  // match friendId from params
  // pull friendId from user's friends array
  // log result
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $pull: { friends: req.params.friendId } }, 
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.json(userData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userControl;
