// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');
const chai = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies
const chaiHttp = require('chai-http');
const { TokenExpiredError } = require('jsonwebtoken');

chai.use(chaiHttp);
chai.should();
// const server = require('../server');
const server = 'http://172.30.44.22:9090'

let token = '';
// let repoName = repoName;
let expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoYW1pemgtbXN5cyIsImVtYWlsIjoidGRoYW5kYXBhbmlAbXN5c3RlY2hub2xvZ2llcy5jb20iLCJvcmdJZCI6MjQ5MzI0MSwib3JnTmFtZSI6Ik1zeXNUZWNobm9sb2dpZXNsbGMiLCJzdGF0dXMiOiJBcHByb3ZlZCIsInJvbGUiOiJBZG1pbiIsImV4cGlyYXRpb25UaW1lIjoiMjAyMi0wNC0xM1QxNDo0Mjo0NloiLCJpYXQiOjE2NDk4MzIxNjZ9.nPDGuOLHVJh9HYinVO2XEELyLKn-y5Rv28vIFhrJ11c';

describe('Getting Token and status check', () => {
  before(function (done) {
    chai.request(server)
      .post('/rest/users/signin')
      .send({ username: 'thamizh-msys', password: 'NewPass@123' })
      .end(function (err, res) {
        token = res.body.token; // Or something
        console.log(token);
        done();
      });
  });
  it('it should get status', (done) => {
    chai.request(server)
      .get('/rest/status')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status('200');
        done();
      });
  });
});

describe('SA Get organizations onboard based status counts routes', () => {
  before(function (done) {
    chai.request(server)
      .get('/rest/admin/getRepoDetails')
      .set('token', token)
      .end(function (err, resp) {
        repoName = resp.body.data.repositories[0].repo_name;
        done();
      });
  });
  it('Expired or Invalid token', done => {
    chai
      .request(server)
      .get('/rest/admin/core/orgOnboardStatusCounts')
      .query({ orgName: 'MsysTechnologiesllc' })
      .set('token', expiredToken)
      .then(res => {
        let data = res.body;
        res.should.have.status(404);
        res.body.should.be.a('object');
        data.should.have.property('message').and.to.equal('Not found');
        done();
      });
  });
  it('SA Get organizations onboard based status counts routes - No data ', done => {
    chai
      .request(server)
      .get('/rest/admin/core/orgOnboardStatusCounts')
      .query({ orgName: 'MsysTechnologiesllc' })
      .set('token', token)
      .then(res => {
        let data = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        // data.should.be.a('array');
        done();
      });
  });
  it('SA Get organizations onboard based status counts routes', done => {
    chai
      .request(server)
      .get('/rest/admin/core/orgOnboardStatusCounts')
      .query({ orgName: 'MsysTechnologiesllc' })
      .set('token', token)
      .then(res => {
        let data = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('SA Get organizations admin approved status counts routes & Get repo name', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/orgStatusCounts')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Get organizations admin approved status counts routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/orgStatusCounts')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA Get organizations admin approved status counts routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/orgStatusCounts')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA Get organizations list routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizations')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Get organizations list routes- No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizations')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA Get organizations list routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizations')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA Get org name for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizationName')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Get org name for admin routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizationName')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA Get org name for admin routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizationName')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA get org details routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizationDetails')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA get org details routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizationDetails')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA get org details routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOrganizationDetails')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA get org onboard repo details routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOnboardedRepositories')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA get org onboard repo details routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOnboardedRepositories')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA get org onboard repo details routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getOnboardedRepositories')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA Get Users for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getUsers')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Get Users for admin routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getUsers')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA Get Users for admin routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getUsers')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA Get members for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getMembers')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Get members for admin routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getMembers')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA Get members for admin routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getMembers')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('SA Activity Logs for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getActivityLogs')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Activity Logs for admin routes - No data ', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getActivityLogs')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          // data.should.be.a('array');
          done();
        });
    });
    it('SA Activity Logs for admin routes with Data', done => {
      chai
        .request(server)
        .get('/rest/admin/core/getActivityLogs')
        .query({ orgName: 'MsysTechnologiesllc' })
        .set('token', token)
        .then(res => {
          let data = res.body.data;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
}); 

describe('POST -  SA Invite org for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .post('/rest/admin/core/inviteOrganization')
        .send({
            org_name: 'SasiMsysOrg',
            org_full_name:  "Sasi Msys Technlogies",
            email: "sganesan@msystechnolgies.com"
            })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Invite org for admin routes - No data ', done => {
      chai.request(server)
        .post('/rest/admin/core/inviteOrganization')
        .send({
            org_name: 'SasiMsysOrg',
            org_full_name:  "Sasi Msys Technlogies",
            email: "sganesan@msystechnolgies.com"
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          done();
        });
    });
    it('SA Invite org for admin routes - Data ', done => {
      chai.request(server)
        .post('/rest/admin/core/inviteOrganization')
        .send({
            org_name: 'SasiMsysOrg',
            org_full_name:  "Sasi Msys Technlogies",
            email: "sganesan@msystechnolgies.com"
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('POST -  SA create Users for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .post('/rest/admin/core/createUser')
        .send({
            full_name: "Tom Hanks",
            usernam: "Tom", 
            email:"tom@hanks.com",
            org_name: "Segate",
            role: 'Admin',
            password: "*******"
        })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA create Users for admin routes - No data ', done => {
      chai.request(server)
        .post('/rest/admin/core/createUser')
        .send({
            full_name: "Tom Hanks",
            usernam: "Tom", 
            email:"tom@hanks.com",
            org_name: "Segate",
            role: 'Admin',
            password: "*******"
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          done();
        });
    });
    it('SA create Users for admin routes - Data ', done => {
      chai.request(server)
        .post('/rest/admin/core/createUser')
        .send({
            full_name: "Tom Hanks",
            usernam: "Tom", 
            email:"tom@hanks.com",
            org_name: "Segate",
            role: 'Admin',
            password: "*******"
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('PUT -  SA Set organizations admin approved routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .put('/rest/admin/core/updateOrganization')
        .send({
            org_id: 17253,
            enable: true
        })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA Set organizations admin approved routes - No data ', done => {
      chai.request(server)
        .put('/rest/admin/core/updateOrganization')
        .send({
            org_id: 17253,
            enable: true
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          done();
        });
    });
    it('SA Set organizations admin approved routes - Data ', done => {
      chai.request(server)
        .put('/rest/admin/core/updateOrganization')
        .send({
            org_id: 17253,
            enable: true
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          res.body.should.be.a('object');
          done();
        });
    });
});

describe('PUT -  SA create Users for admin routes', () => {
    it('Expired or Invalid token', done => {
      chai
        .request(server)
        .put('/rest/admin/core/updateUser')
        .send({
            full_name: "Tom Hanks",
            username: "Tom",
            org_name: "Segate",
            role: 'Admin',
            password: "*******"
        })
        .set('token', expiredToken)
        .then(res => {
          let data = res.body;
          res.should.have.status(404);
          res.body.should.be.a('object');
          data.should.have.property('message').and.to.equal('Not found');
          done();
        });
    });
    it('SA create Users for admin routes - No data ', done => {
      chai.request(server)
        .put('/rest/admin/core/updateUser')
        .send({
            full_name: "Tom Hanks",
            username: "Tom",
            org_name: "Segate",
            role: 'Admin',
            password: "*******"
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          done();
        });
    });
    it('SA create Users for admin routes - Data ', done => {
      chai.request(server)
        .put('/rest/admin/core/updateUser')
        .send({
            full_name: "Tom Hanks",
            username: "Tom",
            org_name: "Segate",
            role: 'Admin',
            password: "*******"
        })
        .set('token', token)
        .end(function (err, res) {
          let data = res.body; // Or something
          res.should.have.status('200');
          res.body.should.be.a('object');
          done();
        });
    });
});
