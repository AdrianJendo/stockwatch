const findWatchlist = (watchlists, id) => {
	for (const watchlist of watchlists) {
		if (watchlist.id === id) {
			return watchlist;
		}
	}
	return -1;
};

export default findWatchlist;
