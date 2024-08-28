import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            } as FilterQuery<T>)
        ),
      })
    }

    return this
  }

  filter() {
    const queryObj = { ...this.query } // Copy query object

    // Exclude fields that are not filters
    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'priceRange',
    ]
    excludeFields.forEach((el) => delete queryObj[el])

    // Handle price range filtering
    const priceRange = this.query?.priceRange as number[] | undefined
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange
      queryObj.pricePerHour = { $gte: minPrice, $lte: maxPrice } // Use pricePerHour instead of price
    }

    // Apply category and other filters (if any)
    if (queryObj.category === '') {
      delete queryObj.category // Remove category filter if it's empty
    }

    // Handle location filtering
    const location = this.query?.location as string | undefined
    if (location) {
      queryObj.location = { $regex: location, $options: 'i' } // Filter by location, case-insensitive
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  sort() {
    const sortParam = this.query?.sort as string | undefined
    let sortCriteria = {}

    if (sortParam) {
      if (sortParam === 'priceAsc') {
        sortCriteria = { pricePerHour: 1 } // Ascending order
      } else if (sortParam === 'priceDesc') {
        sortCriteria = { pricePerHour: -1 } // Descending order
      }
    } else {
      sortCriteria = { pricePerHour: -1 } // Default to descending order if no param is provided
    }

    this.modelQuery = this.modelQuery.sort(sortCriteria)

    return this
  }

  paginate() {
    const page = Number(this.query?.page) || 1
    const limit = Number(this.query?.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const selectFields =
      (this.query?.fields as string)?.split(',')?.join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(selectFields)
    return this
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(totalQueries)
    const page = Number(this.query?.page) || 1
    const limit = Number(this.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
