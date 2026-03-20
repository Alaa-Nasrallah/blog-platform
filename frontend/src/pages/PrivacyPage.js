import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: March 20, 2026</p>
      </div>
      
      <div className="legal-content">
        <div className="legal-intro">
          <p>BlogPlatform is a blog platform where users can read posts, leave comments (with star ratings), and administrators can manage content. This Privacy Policy explains what information we collect and how we use it.</p>
        </div>

        <section>
          <h2>Information We Collect</h2>
          <p>When you use BlogPlatform, we collect the following information:</p>
          <ul>
            <li><strong>Account Information:</strong> When you register, we collect your username and email address. Your password is encrypted using bcrypt and never stored in plain text.</li>
            <li><strong>Content You Create:</strong> This includes blog posts (created by administrators) and comments (created by regular users). Each comment includes a 1-5 star rating.</li>
            <li><strong>Profile Information:</strong> Your username is displayed with your comments and posts.</li>
          </ul>
        </section>

        <section>
          <h2>User Roles and Permissions</h2>
          <p>BlogPlatform has two types of users:</p>
          <ul>
            <li><strong>Regular Users:</strong> Can read posts and leave comments with star ratings (1-5 stars). Regular users cannot create or edit blog posts.</li>
            <li><strong>Administrators:</strong> Can create, edit, and delete any blog post. Administrators can also soft-delete comments (they become hidden but remain in the database). Administrators can view all users and promote regular users to admin.</li>
          </ul>
          <p>Administrators do not have the ability to comment on posts.</p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Display your comments (with star ratings) to other users</li>
            <li>Allow administrators to moderate content (delete posts and soft-delete comments)</li>
            <li>Allow administrators to promote users</li>
            <li>Maintain and improve the platform</li>
          </ul>
        </section>

        <section>
          <h2>What We Do NOT Collect</h2>
          <p>BlogPlatform does NOT collect:</p>
          <ul>
            <li>Profile pictures</li>
            <li>Biographical information</li>
            <li>Phone numbers or physical addresses</li>
            <li>Payment or financial information</li>
            <li>Location data</li>
            <li>Social media profiles</li>
          </ul>
        </section>

        <section>
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. Your content (comments and posts) is visible to all visitors of the platform. Administrators can view user information for moderation purposes.</p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>We protect your information using industry-standard security practices:</p>
          <ul>
            <li>Passwords are hashed using bcrypt (never stored in plain text)</li>
            <li>JWT tokens are used for authentication</li>
            <li>Your data is stored in a secure MongoDB database</li>
            <li>API endpoints are protected with authentication middleware</li>
            <li>Role-based access control ensures users can only access what they're permitted to</li>
          </ul>
        </section>

        <section>
          <h2>Your Rights and Choices</h2>
          <p>Depending on your role, you can:</p>
          <ul>
            <li><strong>Regular Users:</strong> Edit or delete your own comments (deletion is handled by admins as soft delete)</li>
            <li><strong>Administrators:</strong> Create, edit, and delete posts; soft-delete comments; promote users</li>
            <li><strong>All Users:</strong> Delete your account by contacting an administrator</li>
          </ul>
          <p>Regular users cannot delete their own comments directly; only administrators can soft-delete comments.</p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>Your account remains active until you request deletion. When comments are "deleted" by administrators, they are soft-deleted (the `isDeleted` flag is set to true). These comments are hidden from regular users but remain in the database for administrative purposes. Posts deleted by administrators are permanently removed from the database.</p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>We use cookies to store your JWT authentication token, which keeps you logged in. Cookies are essential for the platform to function properly. You can disable cookies in your browser settings, but you will need to log in each time you visit.</p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>Our service is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe a child has registered, please contact us and we will delete the account.</p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>If we make changes to this Privacy Policy, we will update the "Last Updated" date at the top of this page. Continued use of the platform after changes means you accept the updated policy.</p>
        </section>

        <section>
  <h2>Contact Us</h2>
  <p>If you have questions about this Privacy Policy or want to request deletion of your account, contact us:</p>
  <div className="contact-info">
    <p><strong>BlogPlatform</strong><br />
    Email: <a href="mailto:support@blogplatform.com">support@blogplatform.com</a></p>
  </div>
</section>
      </div>
      
      <div className="legal-footer">
        <Link to="/" className="back-home">← Back to Home</Link>
      </div>
    </div>
  );
};

export default PrivacyPage;