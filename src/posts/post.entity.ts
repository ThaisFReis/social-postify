import { Post } from './entities/post/post';

describe('Post', () => {
  it('should be defined', () => {
    expect(new Post()).toBeDefined();
  });
});
