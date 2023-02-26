import Container from "../components/Container";

const Working = () => {
  return (
    <main className="max-w-2xl mx-auto my-20">
      <h1 className="text-center text-3xl font-bold">How we did it?</h1>
      <Container>
        <p>
          The geometric relation among points expresses their spatial position
          concerning each other, further reflecting their underlying shape. KNN
          has demonstrated its abstraction capability for 2D images that are in
          the format of a regular grid. Aligning the point clouds is necessary
          as it will help us efficiently compute the similarity between two
          point clouds. This is done by Compute the centroids of both the source
          and target point clouds. Translate both point clouds so that their
          centroids coincide. Compute the covariance matrix of the two point
          clouds. Compute the Singular Value Decomposition (SVD) of the
          covariance matrix. Compute the rotation matrix and translation vector
          from the SVD. Apply the rotation matrix and translation vector to the
          source point cloud. Repeat the above steps until convergence. The
          following steps include scale{" "}
        </p>
      </Container>
    </main>
  );
};

export default Working;
