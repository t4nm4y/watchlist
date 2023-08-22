const Watchlist = require('../model/Model');

//getAll, getMovies, getWebseries, getAnime, getAnimeMovie, getAnimeSeries
module.exports.getAll = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({}).sort({ title: 1 });
        res.send(list);
    }
    catch(err){
        console.error('Error fetching the list:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getMovies = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({ category: 'M' }).sort({ title: 1 });
        res.send(list);
    }
    catch(err){
        console.error('Error fetching the list:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getWebseries = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({ category: 'S' }).sort({ title: 1 });
        res.send(list);
    }
    catch(err){
        console.error('Error fetching the list:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getAnime = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({ category: 'A' }).sort({ title: 1 });
        res.send(list);
    }
    catch(err){
        console.error('Error fetching the list:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getAnimeMovie = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({ category: 'AM' }).sort({ title: 1 });
        res.send(list);
    }
    catch(err){
        console.error('Error fetching the list:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getAnimeSeries = async(req,res)=> { 
    try{
        // to find all the docs in a collection
        const list=await Watchlist.find({ category: 'AS' }).sort({ title: 1 });
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
