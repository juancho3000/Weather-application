function propsProducts(req, res, next) {
  const { name, place } = req.body;
  if (!name || !place) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} Name and place are requiered`,
    });
  } else {
    return next();
  }
}

export default propsProducts;
