import links from '../links.json';

export default function handle(req, res) {
  res.json(links);
}
