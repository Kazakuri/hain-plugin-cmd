(function(){
  'use strict';

  const os = require('os');
  const spawn = require('child_process').execFile;

  module.exports = (context) => {
    function search(query, res) {
      const query_trim = query.trim();

      if (query_trim.length === 0)
        return;

      res.add({
        id: query_trim,
        payload: 'open',
        title: query_trim,
        desc: 'execute command'
      });
    }

    function execute(id, payload) {
      if (payload !== 'open')
        return;

      var child = spawn('cmd', ['/c', 'start cmd /k',  id],  {
       detached: true,
       stdio: 'ignore',
       cwd: os.homedir()
      });

      child.unref();
    }

    return { search, execute };
  };
})();
