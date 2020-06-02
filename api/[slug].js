import links from '../links.json';

export default function handle(req, res) {
  const { slug } = req.query;

  if (links[slug]) {
    res.writeHead(302, {
      Location: links[slug],
    });
    res.end();
  } else {
    res.status(404);
    res.end();
  }
}
