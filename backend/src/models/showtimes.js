const dbConn = require("../helpers/db");
const table = "showtimes";

exports.createShowtime = async (data = {}) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `INSERT INTO ${table} (${Object.keys(
        data
      ).join()}) VALUES (${Object.values(data)
        .map((item) => `"${item}"`)
        .join(",")})`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.createBulkShowtime = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `INSERT INTO ${table} (idMovie, idSeat) VALUES ${data
        .map((idSeat) => `(${id}, ${idSeat})`)
        .join()}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getShowtimeByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `
			SELECT DISTINCT cinemas.id as cinemaId, cinemas.name as cinemaName, 
			cinemas.picture as cinemaPicture, 
			cinemas.address as cinemaAddress, s.price as cinemaPrice,
			times.name as timeName, times.id as timeId 
			FROM ${table} s
			INNER JOIN times,cinemas
			WHERE  idMovie = ${cond.movie}
			
			`,
      (err, res, field) => {
        console.log(res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getShowtimeByMovieId = (cond) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `
			SELECT DISTINCT cinemas.id as cinemaId, cinemas.name as cinemaName, 
			cinemas.picture as cinemaPicture, 
			cinemas.address as cinemaAddress, s.price as cinemaPrice,
			times.name as timeName, times.id as timeId 
			FROM ${table} s
			INNER JOIN times,cinemas
			WHERE  idMovie = ${cond.movie}
			`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
exports.getLocDate = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `
			SELECT showTimeDate, idLocation FROM ${table} WHERE idMovie = ${id}
			`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
exports.getPriceByMovieID = (id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
			SELECT price FROM ${table} WHERE idMovie = ${id} 
			`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getShowOrder = (id) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `
			SELECT * FROM ${table} WHERE id=${id}
			`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

// exports.getShowOrder = (cond) => {
// 	return new Promise((resolve, reject) => {
// 		dbConn.query(
// 			`
// 			SELECT showtimes.id FROM ${table}
// 			WHERE showTimeDate LIKE "${cond.date}"
// 			AND idLocation LIKE "${cond.location}"
// 			AND idMovie LIKE "${cond.movie}"
// 			`,
// 			(err, res, field) => {
// 				if (err) reject(err);
// 				resolve(res);
// 			},
// 		);
// 	});
// };
