const { Thought, User } = require('../models');
// ----------------------- //
// *** thought control *** //
// ----------------------- //
// mongoose methods to create, retrieve, update, and delete data
const thoughtControl = {
  // ---------------- //
  // --- FIND ALL --- //
  // ---------------- //
  // sorted by most recent
  async findAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find()
        .sort({ createdAt: -1 });

      res.json(thoughtData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ---------------------- //
  // --- FIND ONE BY ID --- //
  // ---------------------- //
  // match thoughtId from a req param
  async findOneThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ 
        _id: req.params.thoughtId // where id matches parameter
      });

      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(thoughtData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ------------------- //
  // --- NEW THOUGHT --- //
  // ------------------- //
  // pass thought object through req body
  // push new thought to user's thoughts array
  async newThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'Thought created but does not belong to a user.' });
      }

      res.json({ message: 'Thought successfully created.' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // -------------------- //
  // --- EDIT THOUGHT --- //
  // -------------------- //
  // match thoughtId from req param
  // set req body to effectively update the data entry
  // validate and log data
  async editThought(req, res) {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $set: req.body }, 
      { runValidators: true, new: true }
    );

    if (!thoughtData) {
      return res.status(404).json({ message: 'Thought not found.' });
    }

    res.json(thoughtData);

    console.log(err);
    res.status(500).json(err);
  },
  // ---------------------- //
  // --- DELETE THOUGHT --- //
  // ---------------------- //
  // match thoughtId from req param
  // find thought's user
  // pull thought to delete it from thoughts array
  // log result
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndRemove({ 
        _id: req.params.thoughtId 
      })

      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      const dbUser = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUser) {
        return res.status(404).json({ message: 'Thought deleted but no user found.' });
      }

      res.json({ message: 'Thought deleted successfully.' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ----------------------- //
  // --- TOGGLE REACTION --- //
  // --------- ON ---------- //
  // ----------------------- //
  // match thoughtId from req params
  // add req.body to thought's reactions array
  // validate data and log result
  async onReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ----------------------- //
  // --- TOGGLE REACTION --- //
  // --------- OFF --------- //
  // ----------------------- //
  // match thoughtId from req params
  // match reactionId from req params
  // pull reaction from thought's reactions array
  // validate data and log result
  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtControl;
