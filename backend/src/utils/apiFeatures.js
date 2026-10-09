// Reusable query builder for filtering, search, sort, and pagination
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.q) {
      this.query = this.query.find({ $text: { $search: this.queryString.q } });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["q", "sort", "page", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Support range filters like cookingTime[lte]=30
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
