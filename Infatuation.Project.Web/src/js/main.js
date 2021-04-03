import Index from './Index';
import GithubSearch from './GithubSearch';
import $ from 'jquery';

$('.githubSearch').each((i, v) => new GithubSearch($(v)));
$('.indexPage').each((i, v) => new Index($(v)));