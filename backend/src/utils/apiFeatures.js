class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'destination', 'minPrice', 'maxPrice'];
    excludedFields.forEach((el) => delete queryObj[el]);

    
    if (this.queryString.destination) {
      queryObj.$or = [
        { destination: { $regex: this.queryString.destination, $options: 'i' } },
        { title: { $regex: this.queryString.destination, $options: 'i' } }
      ];
    }

    
    if (this.queryString.minPrice || this.queryString.maxPrice) {
      queryObj.price = {};
      if (this.queryString.minPrice) queryObj.price.gte = Number(this.queryString.minPrice);
      if (this.queryString.maxPrice) queryObj.price.lte = Number(this.queryString.maxPrice);
    }

    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      
      let sortBy = this.queryString.sort;
      if (sortBy === 'price_asc') sortBy = 'price';
      if (sortBy === 'price_desc') sortBy = '-price';
      
      this.query = this.query.sort(sortBy.split(',').join(' '));
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
