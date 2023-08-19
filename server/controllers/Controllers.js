const Watchlist = require('../model/Model');

//getList, addMovie, updateMovie, deleteMovie
module.exports.getList = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({});
        res.send(list);
    }
    catch(err){
        console.error('Error fetching the list:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.addMovie = async(req,res)=> {
    try{
        const {title, category, watchedDate}=req.body;
        const newMovie= await Watchlist.create({title, category, watchedDate});
        res.status(201).send(newMovie);
    }
    catch(err){
        console.error('Error adding the movie:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.updateMovie = async(req,res)=> {
    try {
        const { _id, title, category, watchedDate} = req.body;
        const updatedMovie = await Watchlist.findByIdAndUpdate(
            _id,{title, category, watchedDate},{ new: true }
        );

        if (!updatedMovie) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(updatedMovie);
      } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports.deleteMovie = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedMovie = await Watchlist.findByIdAndDelete(_id);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
