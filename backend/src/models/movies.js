
// to get the max id
const dbConn = require("../helpers/db");
const table = "movies";

exports.getMaxMovieId = async () => {
    try {
        const [rows] = await dbConn.promise().query(`SELECT MAX(id) AS maxId FROM ${table}`);
        
        // Assuming there's always at least one movie in the table
        return rows[0].maxId;
    } catch (error) {
        console.error("Failed to retrieve max movie ID:", error);
        throw error; // or return some error indication
    }
};

  
exports.createMovie = (data = {}, cb) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO ${table} (${Object.keys(
				data,
			).join()}) VALUES (${Object.values(data)
				.map((item) => `"${item}"`)
				.join(",")})`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
// toan

exports.insertMovie = (data = {}, cb) => {
	console.log("model data"+data);
	return new Promise((resolve, reject) => {
		dbConn.query(
			`INSERT INTO ${table} (${Object.keys(
				data,
			).join()}) VALUES (${Object.values(data)
				.map((item) => `"${item}"`)
				.join(",")})`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};
// toan
// exports.insertMovie = (id, data) => {
// 	return new Promise((resolve, reject) => {
// 		const key = Object.keys(data);
// 		const value = Object.values(data);
// 		console.log(`UPDATE ${table}
// 		SET ${key.map((item, index) => `${item}="${value[index]}"`)}
// 		WHERE id=${id}`,);
// 		dbConn.query(
// 			`UPDATE ${table}
// 			SET ${key.map((item, index) => `${item}="${value[index]}"`)}
// 			WHERE id=${id}`,
// 			(err, res, field) => {
// 				if (err) reject(err);
// 				resolve(res);
// 			},
// 		);
// 	});
// };

exports.getMovieByIdWithItems = (id) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
			SELECT m.id, m.title, m.picture, m.releaseDate, m.directed, m.duration, 
			m.cast, m.synopsis, g.name as genreName
			FROM ${table} m 
			LEFT JOIN movie_genres mg ON m.id = mg.idMovie 
			LEFT JOIN genres g ON g.id = mg.idGenre
			WHERE m.id = ${id}
  		`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};

exports.getMoviesCountByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		const query = dbConn.query(
			`
    SELECT COUNT(title) as totalData FROM
    ${table} WHERE title LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
		console.log(query.sql);
	});
};


exports.deleteMovieById = (id) => {
	return new Promise((resolve, reject) => {
		dbConn.query(`DELETE FROM ${table} WHERE id=${id}`, (err, res, field) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

exports.getMoviesByCondition = (cond) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`SELECT * FROM ${table} m
			WHERE m.title LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order} 
			LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.updateMovie = (id, data) => {
	return new Promise((resolve, reject) => {
		const key = Object.keys(data);
		const value = Object.values(data);
		console.log(`UPDATE ${table}
		SET ${key.map((item, index) => `${item}="${value[index]}"`)}
		WHERE id=${id}`,);
		dbConn.query(
			`UPDATE ${table}
			SET ${key.map((item, index) => `${item}="${value[index]}"`)}
			WHERE id=${id}`,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.getMovieById = async (id, cb) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`
    SELECT * FROM ${table} WHERE id=${id}
    `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};

exports.checkMovie = (data = []) => {
	return new Promise((resolve, reject) => {
		dbConn.query(
			`
    SELECT * FROM ${table}
    WHERE id IN (${data.map((item) => item).join()})
    `,
			(err, res, field) => {
				if (err) reject(err);
				resolve(res);
			},
		);
	});
};