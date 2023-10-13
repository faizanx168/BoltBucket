import { pool } from "../config/database.js";

const getCars = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM mycar ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createCar = async (req, res) => {
  try {
    const { name, exterior, interior, wheels, roof, price, convertible } =
      req.body;
    const results = await pool.query(
      `
  INSERT INTO mycar (name, exterior, interior, wheels, roof, price, convertible)
  VALUES($1, $2, $3, $4, $5, $6,$7)
  RETURNING *`,
      [name, exterior, interior, wheels, roof, price, convertible]
    );
    res.status(201).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
const getCarById = async (req, res) => {
  try {
    const carId = req.params.carId;
    const selectQuery = `SELECT name, exterior, interior, wheels, roof, price, convertible FROM mycar WHERE id = ${carId}`;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, exterior, interior, wheels, roof, price } = req.body;
    const results = await pool.query(
      `
    UPDATE mycar SET name= $1, exterior= $2, interior= $3, wheels= $4, roof= $5, price= $6 WHERE id = $7`,
      [name, exterior, interior, wheels, roof, price, id]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
const deleteCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("DELETE FROM mycar WHERE id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export default {
  getCars,
  getCarById,
  createCar,
  deleteCar,
  updateCar,
};
