import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: March 20, 2026</p>
      </div>
      
      <div className="legal-content">
        <div className="legal-intro">
          <p>Welcome to BlogPlatform! By using our service, you agree to these Terms of Service. Please read them carefully.</p>
        </div>

        <section>
          <h2>1. Who Can Use BlogPlatform</h2>
          <p>You must be at least 13 years old to create an account. If you are under 18, you must have permission from a parent or guardian.</p>
        </section>

        <section>
          <h2>2. User Roles and Permissions</h2>
          <p>BlogPlatform has two user roles:</p>
          <ul>
            <li><strong>Regular Users:</strong> Can read blog posts and leave comments with 1-5 star ratings. Regular users cannot create, edit, or delete blog posts.</li>
            <li><strong>Administrators:</strong> Can create, edit, and delete any blog post. Administrators can soft-delete comments (hide them from public view). Administrators can view all users and promote regular users to admin status.</li>
          </ul>
          <p>Administrators cannot leave comments on posts. This is by design to separate content creation from content moderation.</p>
        </section>

        <section>
          <h2>3. Your Account</h2>
          <p>You are responsible for keeping your password secure. BlogPlatform is not liable for any issues caused by unauthorized access to your account. You agree to provide accurate information when registering.</p>
        </section>

        <section>
          <h2>4. Content You Post</h2>
          <ul>
            <li><strong>Regular Users:</strong> You own the comments you post. By posting a comment, you grant BlogPlatform permission to display your comment and star rating to other users.</li>
            <li><strong>Administrators:</strong> You own the blog posts you create. By posting, you grant BlogPlatform permission to display your content to all users.</li>
          </ul>
          <p>You are responsible for the content you post. Administrators may remove content that violates these terms.</p>
        </section>

        <section>
          <h2>5. Prohibited Content</h2>
          <p>You may not post content that:</p>
          <ul>
            <li>Is illegal, harassing, or abusive</li>
            <li>Contains hate speech or discrimination</li>
            <li>Infringes on others' intellectual property</li>
            <li>Contains viruses or malicious code</li>
            <li>Is spam or contains misleading information</li>
            <li>Contains inappropriate or offensive material</li>
          </ul>
        </section>

        <section>
          <h2>6. Moderation and Enforcement</h2>
          <p>Administrators may:</p>
          <ul>
            <li>Delete any blog post that violates these terms</li>
            <li>Soft-delete any comment (hide it from public view) that violates these terms</li>
            <li>Suspend or terminate accounts that repeatedly violate these rules</li>
            <li>Promote regular users to admin status</li>
          </ul>
          <p>Soft-deleted comments remain in the database but are not visible to regular users or guests.</p>
        </section>

        <section>
          <h2>7. Account Termination</h2>
          <p>You may request account deletion by contacting an administrator. Administrators may terminate accounts that violate these terms or are inactive for an extended period. Upon termination, your content may be removed or anonymized.</p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>BlogPlatform is provided "as is." We do not guarantee that the service will be uninterrupted or error-free. We are not responsible for user-generated content or any damages resulting from use of the platform.</p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>We may update these terms occasionally. If we make significant changes, we will notify you. Continued use of the platform after changes means you accept the updated terms.</p>
        </section>

        <section>
  <h2>Contact</h2>
  <p>For questions about these terms, contact us at:</p>
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

export default TermsPage;